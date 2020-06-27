# README

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null:false, add_index unique: true|


### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null:false|
|email|string|null:false, add_index unique: true|
|password|string|null:false|

### Association
has_many :groups_users
has_many :groups, through: :groups_users
has_many :messages



## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|references|null:false, foreign_key: true|
|gourp_id|references|null:false, foregn_key: true|

### Association
- belongs_to :group
- belongs_to :user