const OrganizationModel = require('../Models/OrganizationModel');
const BaseController = require('./BaseController');

class OrganizationController extends BaseController {
    constructor() {
        super(OrganizationModel);
    }

    async getSingleOrganization(req, res) {
        try {
            const id = req.params.id;
            if (!this.validateId(id, res)) {
                return;
            }
            const organization = await this.getSingleItem(id, res);
            res.status(200).json({ organization });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllOrganizations(req, res) {
        await this.getAllItems(req, res);
    }

    async createNewOrganization(req, res) {
        try {
            const data = req.body;
            const organization = await this.createNewItem(data, res);
            res.status(200).json({ organization });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateOrganization(req, res) {
        try {
            const id = req.params.id;
            if (!this.validateId(id, res)) {
                return;
            }
            const data = req.body;
            const organization = await this.updateExistingItem(id, data, res);
            res.status(200).json({ organization });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteSingleOrganization(req, res) {
        try {
            const id = req.params.id;
            if (!this.validateId(id, res)) {
                return;
            }
            const organization = await this.deleteSingleItem(id, res);
            res.status(200).json({ organization });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteAllOrganizations(req, res) {
        try {
            const result = await this.deleteAllItems(req, res);
            res.status(200).json({ message: `${result.deletedCount} organizations deleted` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new OrganizationController();
