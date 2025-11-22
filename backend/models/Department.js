const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  budget: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

// Cascade delete employees when a department is deleted via findOneAndDelete / findByIdAndDelete
DepartmentSchema.pre('findOneAndDelete', async function(next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    await mongoose.model('Employee').deleteMany({ department: doc._id });
  }
  next();
});

module.exports = mongoose.model('Department', DepartmentSchema);
