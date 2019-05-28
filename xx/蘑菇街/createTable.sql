

-- 创数据库
create database mogujie charset utf8



-- 创建type表
create table type(id int auto_increment primary key,title varchar(255),url text,acm text);


-- 创建goods表

create table goods(id int auto_increment primary key,
                  title varchar(255) default null ,
                  img_url text default null ,
                  oldPrice float default null ,
                  nowPrice float default null ,
                  pintuanPrice float default null ,
                  sales int default 0 ,
                  comment int default 0 ,
                  totalStock int default 0,
                  goods_desc text default null ,
                  effect text default null ,
                  parameter text default null
);
