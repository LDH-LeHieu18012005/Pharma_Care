const Order = {
  tableName: 'orders',
  modelName: 'Order',
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
      name: 'user_id',
      type: 'int(10) unsigned',
      nullable: 'NO',
      key: 'MUL',
      extra: ''
    },
    {
      name: 'order_code',
      type: 'varchar(50)',
      nullable: 'NO',
      key: 'UNI',
      extra: ''
    },
    {
      name: 'receiver_name',
      type: 'varchar(100)',
      nullable: 'NO',
      key: '',
      extra: ''
    },
    {
      name: 'receiver_phone',
      type: 'varchar(20)',
      nullable: 'NO',
      key: '',
      extra: ''
    },
    {
      name: 'shipping_address',
      type: 'varchar(255)',
      nullable: 'NO',
      key: '',
      extra: ''
    },
    {
      name: 'total_amount',
      type: 'decimal(15,2) unsigned',
      nullable: 'NO',
      key: '',
      extra: ''
    },
    {
      name: 'payment_method',
      type: 'enum("COD","BANK_TRANSFER","VNPAY","MOMO")',
      nullable: 'NO',
      key: '',
      extra: ''
    },
    {
      name: 'payment_status',
      type: 'enum("UNPAID","PAID","REFUNDED")',
      nullable: 'NO',
      key: '',
      extra: ''
    },
    {
      name: 'order_status',
      type: 'enum("PENDING","CONFIRMED","SHIPPING","DELIVERED","CANCELLED")',
      nullable: 'NO',
      key: 'MUL',
      extra: ''
    },
    {
      name: 'note',
      type: 'text',
      nullable: 'YES',
      key: '',
      extra: ''
    },
    {
      name: 'created_at',
      type: 'datetime',
      nullable: 'NO',
      key: 'MUL',
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
  'user_id',
  'order_code',
  'receiver_name',
  'receiver_phone',
  'shipping_address',
  'total_amount',
  'payment_method',
  'payment_status',
  'order_status',
  'note',
  'created_at',
  'updated_at'
  ],
  searchable: [
  'order_code',
  'receiver_name',
  'receiver_phone',
  'shipping_address',
  'note'
  ],
  foreignKeys: [
    {
      column: 'user_id',
      referencedTable: 'users',
      referencedColumn: 'id'
    },
  ]
};

module.exports = Order;
