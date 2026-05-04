module.exports = {
  tableName: 'staff',
  primaryKey: 'id_staff',
  fillable: ['name_staff','age_staff','gender_staff','phone_staff','address_staff','gmail_staff','start_date','permission','username','password','status','images'],
  searchable: ['name_staff','username','gmail_staff','phone_staff']
};
