# README

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false,
foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group|string||
|menber|stirng|foreign_key: true|
|message_id|references|null: false,foreign_kye: true|
|user_id|references|null:false,
foreign_kye: true|

### Association
- has_many :groups_users
- has_many :users, through: :groups_users


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null:false|
|email|string|null:false,
add_index unique: true|
|password|string|null:false|

### Association
has_many :groups_users
has_many :groups, through: :groups_users
has_many :messages



## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null:false|
|image|string||
|user_id|references|null:false,
foreign_kye: true|
|gourp_id|references|null:false,
foregn_kye: true|

### Association
- belongs_to :group
- belongs_to :user