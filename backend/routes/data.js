const express = require("express");
const router = express.Router();
const data = require("../controllers/data")
const auth = require("../config/authenticate")

router.post('/new_upload', auth.authenticateToken, data.save);
router.get('/past_uploads', auth.authenticateToken, data.fetch);
router.delete('/delete_record/:record_id', auth.authenticateToken, data.delete);
router.get('/send_email_to_mentors/:record_id', auth.authenticateToken, data.sendLinkMentors);


module.exports = router;