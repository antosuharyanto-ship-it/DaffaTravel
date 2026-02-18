const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Public: Submit interest
const createLead = async (req, res) => {
    try {
        const { name, email, phone, whatsapp, preferredDate, packageId } = req.body;
        const newLead = await prisma.lead.create({
            data: {
                name,
                email,
                phone,
                whatsapp,
                preferredDate: new Date(preferredDate),
                packageId: packageId ? parseInt(packageId) : null,
                status: 'PENDING'
            }
        });
        res.status(201).json(newLead);
    } catch (error) {
        console.error("Error creating lead:", error);
        res.status(500).json({ message: "Failed to submit interest" });
    }
};

// Admin: Get all leads
const getLeads = async (req, res) => {
    try {
        const leads = await prisma.lead.findMany({
            include: { package: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch leads" });
    }
};

// Admin: Update lead status
const updateLeadStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedLead = await prisma.lead.update({
            where: { id: parseInt(id) },
            data: { status }
        });
        res.json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: "Failed to update lead" });
    }
};

// Admin: Delete lead
const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.lead.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Lead deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete lead" });
    }
};

module.exports = { createLead, getLeads, updateLeadStatus, deleteLead };
