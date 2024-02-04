
import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

const Url = mongoose.models.Url || mongoose.model('Url', urlSchema);

export default Url;
