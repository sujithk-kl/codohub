const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Python code execution endpoint
router.post('/execute', async (req, res) => {
    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }

    const fileName = `temp_${uuidv4()}.py`;
    const runnerDir = path.join(__dirname, '../python_runner');
    const filePath = path.join(runnerDir, fileName);

    try {
        // Ensure runner directory exists
        try {
            if (!fs.existsSync(runnerDir)) {
                fs.mkdirSync(runnerDir, { recursive: true });
            }
        } catch (dirErr) {
            return res.status(500).json({ success: false, output: '', error: `Server error: ${dirErr.message}` });
        }

        // Write code to temporary file
        fs.writeFileSync(filePath, code);

        // Execute Python code
        const pythonBin = process.env.PYTHON_BIN || 'python';
        const pythonProcess = spawn(pythonBin, [filePath], {
            timeout: 10000, // 10 second timeout
            maxBuffer: 1024 * 1024 // 1MB buffer
        });

        let stdout = '';
        let stderr = '';

        pythonProcess.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        pythonProcess.on('close', (code) => {
            // Clean up temporary file
            try {
                fs.unlinkSync(filePath);
            } catch (error) {
                console.error('Error deleting temporary file:', error);
            }

            if (code === 0) {
                res.json({
                    success: true,
                    output: stdout,
                    error: null
                });
            } else {
                res.json({
                    success: false,
                    output: stdout,
                    error: stderr
                });
            }
        });

        pythonProcess.on('error', (error) => {
            // Clean up temporary file
            try {
                fs.unlinkSync(filePath);
            } catch (unlinkError) {
                console.error('Error deleting temporary file:', unlinkError);
            }

            res.status(500).json({
                success: false,
                output: '',
                error: `Execution error: ${error.message}`
            });
        });

    } catch (error) {
        // Clean up temporary file if it exists
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (unlinkError) {
            console.error('Error deleting temporary file:', unlinkError);
        }

        res.status(500).json({
            success: false,
            output: '',
            error: `Server error: ${error.message}`
        });
    }
});

module.exports = router;
