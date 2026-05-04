module.exports = {
  tableName: 'medicine',
  primaryKey: 'id_medicine',
  fillable: ['name_medicine','quantity_total','price','medicine_status','id_type','id_rack','manufacturing_date','expiry_date','descriptions','images'],
  searchable: ['name_medicine','descriptions']
};
