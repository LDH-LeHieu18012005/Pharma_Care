module.exports = {
  tableName: 'customer',
  primaryKey: 'id_customer',
  fillable: ['name_customer','age_customer','gender_customer','phone_customer','address_customer'],
  searchable: ['name_customer','phone_customer','address_customer']
};
