const Product = {
  tableName: 'products',
  modelName: 'Product',
  primaryKey: 'id',
  columns: [
    {
      name: 'id',
      type: 'int(10) unsigned',
      nullable: 'NO',
      key: 'PRI',
      extra: 'auto_increment'
    },
    {
      name: 'name',
      type: 'varchar(255)',
      nullable: 'NO',
      key: 'MUL',
      extra: ''
    },
    {
      name: 'category_id',
      type: 'int(10) unsigned',
      nullable: 'NO',
      key: 'MUL',
      extra: ''
    },
    {
      name: 'brand_id',
      type: 'int(10) unsigned',
      nullable: 'NO',
      key: 'MUL',
      extra: ''
    },
    {
      name: 'price',
      type: 'decimal(15,2) unsigned',
      nullable: 'NO',
      key: 'MUL',
      extra: ''
    },
    {
      name: 'stock',
      type: 'int(10) unsigned',
      nullable: 'NO',
      key: '',
      extra: ''
    },
    {
      name: 'description',
      type: 'text',
      nullable: 'YES',
      key: '',
      extra: ''
    },
    {
      name: 'ingredients',
      type: 'text',
      nullable: 'YES',
      key: '',
      extra: ''
    },
    {
      name: 'thumbnail',
      type: 'varchar(255)',
      nullable: 'YES',
      key: '',
      extra: ''
    },
    {
      name: 'is_active',
      type: 'tinyint(1)',
      nullable: 'NO',
      key: '',
      extra: ''
    },
    {
      name: 'created_at',
      type: 'datetime',
      nullable: 'NO',
      key: '',
      extra: ''
    },
    {
      name: 'updated_at',
      type: 'datetime',
      nullable: 'NO',
      key: '',
      extra: 'on update current_timestamp()'
    },
  ],
  fillable: [
  'name',
  'category_id',
  'brand_id',
  'price',
  'stock',
  'description',
  'ingredients',
  'thumbnail',
  'is_active',
  'created_at',
  'updated_at'
  ],
  searchable: [
  'name',
  'description',
  'ingredients',
  'thumbnail'
  ],
  foreignKeys: [
    {
      column: 'category_id',
      referencedTable: 'categories',
      referencedColumn: 'id'
    },
    {
      column: 'brand_id',
      referencedTable: 'brands',
      referencedColumn: 'id'
    },
  ]
};

module.exports = Product;
