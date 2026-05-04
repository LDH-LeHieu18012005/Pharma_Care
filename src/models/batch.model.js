module.exports = {
  tableName: 'batchs',
  primaryKey: 'id_batch',
  fillable: ['id_medicine','quantity_in_batch','entry_price','manufacturing_date','expiry_date','status','quantity_shortage','reason'],
  searchable: ['reason']
};
