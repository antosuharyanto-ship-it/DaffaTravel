const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all branches
const getBranches = async (req, res) => {
    try {
        const branches = await prisma.branch.findMany({
            include: { agents: { select: { id: true, name: true, email: true } } }
        });
        res.json(branches);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching branches' });
    }
};

// Create new branch
const createBranch = async (req, res) => {
    try {
        const { name, location, contact } = req.body;
        const branch = await prisma.branch.create({
            data: { name, location, contact }
        });
        res.status(201).json(branch);
    } catch (error) {
        res.status(500).json({ error: 'Error creating branch' });
    }
};

// Update branch
const updateBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await prisma.branch.update({
            where: { id: parseInt(id) },
            data: req.body
        });
        res.json(branch);
    } catch (error) {
        res.status(500).json({ error: 'Error updating branch' });
    }
};

// Delete branch
const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.branch.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Branch deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting branch' });
    }
};

module.exports = { getBranches, createBranch, updateBranch, deleteBranch };
