create database restaurants;
use restaurants;
-- Tables table
CREATE TABLE Tables (
    table_id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT NOT NULL UNIQUE,
    status ENUM('occupied', 'vacant') DEFAULT 'vacant',
    qr_code VARCHAR(255) NOT NULL UNIQUE
    -- Add more table-related fields as needed
);




-- Menu Items table
CREATE TABLE MenuItems (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
	description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50)
    -- Add more item-related fields as needed
);

-- Order Statuses table
CREATE TABLE OrderStatuses (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    status_name ENUM('pending', 'preparing', 'delivered') NOT NULL
);

-- Orders table
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    table_id INT NOT NULL,
    status_id INT DEFAULT 1, -- Default to 'pending' status
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (table_id) REFERENCES Tables(table_id),
    FOREIGN KEY (status_id) REFERENCES OrderStatuses(status_id)
);

-- OrderItems table (to store individual items within an order)
CREATE TABLE OrderItems (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    special_instructions TEXT,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (item_id) REFERENCES MenuItems(item_id)
);

-- Chefs table
CREATE TABLE Chefs (
    chef_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20)
    -- Add more chef-related fields as needed
);

-- Managers table
CREATE TABLE Managers (
    manager_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20)
    -- Add more manager-related fields as needed
);

-- Bills table (to store bill details)
CREATE TABLE Bills (
    bill_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    -- Add more bill-related fields as needed
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

ALTER TABLE MenuItems
ADD COLUMN src varchar(255);


ALTER TABLE MenuItems
ADD COLUMN Subcategory varchar(255),
ADD COLUMN Recommended boolean,
ADD COLUMN  Availability boolean,
ADD COLUMN Vegonly boolean;

ALTER TABLE MenuItems
CHANGE COLUMN category Maincategory		varchar(255);

ALTER TABLE managers
CHANGE COLUMN contact_number  Password		varchar(255);


-- Random operations
DELETE FROM MenuItems WHERE item_id = 1;
DELETE FROM MenuItems WHERE item_id = 2;
DELETE FROM MenuItems WHERE item_id =3;
DELETE FROM MenuItems WHERE item_id = 4;
DELETE FROM MenuItems WHERE item_id = 5;
								-- authentications user
                                
CREATE USER Sudarshan IDENTIFIED BY 'Sudarshan@2004';
CREATE USER Suyash IDENTIFIED BY 'Suyash@2003';

insert into tables values (1,1,'occupied','dhfsjjf');
insert into tables values (2,2,'occupied','dhfsjkjf');

-- order statuses table
INSERT INTO orderstatuses values(1,'Pending');
INSERT INTO orderstatuses values(2,'Preparing');
INSERT INTO orderstatuses values(4,'paid');

-- random operations----------------------------
UPDATE MenuItems SET recommended = false WHERE 1;

 SET SQL_SAFE_UPDATES=0; 
UPDATE MenuItems
SET recommended = 1
WHERE item_id IN (1, 2, 5, 6, 7, 9, 10, 11, 12, 14, 18, 31, 32, 38, 39, 40, 41, 53, 59, 63, 65, 68, 69, 72, 76, 80, 86, 87, 88);


UPDATE MenuItems
SET src = CASE
  WHEN item_id = 80 THEN 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/gnqxodhrtphcmaqxawah'
  WHEN item_id = 81 THEN 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/bv2q87b1qaacnhuko6ge'
  WHEN item_id = 82 THEN 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/f39531b75c396103df3b1913a7c40951'
  WHEN item_id = 83 THEN 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/dlqxx5opepyrqyo4jla2'
END
WHERE item_id IN (80, 81, 82, 83);

ALTER TABLE orderstatuses
MODIFY COLUMN status_name ENUM('pending', 'preparing', 'delivered','justpaid','paid','billGen') NOT NULL;

UPDATE MenuItems
SET src = CASE
    WHEN item_id = 15 THEN 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/vpwsq4cs7rj4wpmmqfbp'
    WHEN item_id = 42 THEN 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/736d68b0c0152ffab4c3c70b1419e26d'
END
WHERE item_id IN (15, 42);



INSERT INTO MenuItems (item_id, name, src, description, price, MainCategory, Availability, Recommended, Subcategory, Vegonly) VALUES
  (92, 'Roti', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/gatduz9xecvqaecdjlhw', 'Tandoori Roti (Plain)', 30, 'Roti', 1, 1, 'main course', 1),
  (93, 'Butter Roti', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/a9f73ec92439682f549de78823c8d2b8', 'Tandoori Roti (Butter)', 40, 'Roti', 1, 1, 'main course', 1),
  (94, 'Naan', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/6b25269bc49df800bdc902316e1449f3', 'Plain Naan', 50, 'Roti', 1, 1, 'main course', 1),
  (95, 'Butter Naan', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ivxojmpbipk4nd7n27fi', 'Butter Naan', 60, 'Roti', 1, 0, 'main course', 1),
  (96, 'Chapati', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/9a516cfd751ac757f096fc7e6ac6f0bc', 'Tava Chapati', 20, 'Roti', 1, 0, 'main course', 1);

UPDATE MenuItems
SET item_id = CASE
    WHEN item_id BETWEEN 92 AND 96 THEN item_id - 6
    ELSE item_id
END;

UPDATE orderstatuses
SET status_id=6
where status_name="paid";
insert into orderstatuses values (4,'justpaid');
-- //////////////////////////////////////////////////////////////creating table reviews /////////////////////////////////////////////////////////////////////////////
CREATE TABLE reviews(
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    stars INT CHECK (stars >= 1 AND stars <= 5)
    
);


    
INSERT INTO MenuItems ( item_id,name ,src,description,price,MainCategory,Availability,Recommended,Subcategory,Vegonly) VALUES ( 1, 'Panner Chilly Dry', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/uekzuohoidduvaheuiio', 'Medium Spicy | Serves 1 | Chunks of tender paneer in a crispy, savory coating with the perfect amount of heat.', 280, 'Veg Starter', True, True, 'chineese', True ),
( 2, 'Veg Manchurian Dry', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/u3zwuih9nt2fdqdfafy1', 'Medium Spicy | 14 pieces | Serves 1 | Crispy veg balls tossed in a savory and flavorful sauce.', 240, 'Veg Starter', True, True, 'chineese', True ),
( 3, 'Veg Crispy', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wcb7pg8gqup89fkutc6x', 'Serves 1 | Veg crispy is basically batter fried veggies later stir fried in Schzewan sauce', 240, 'Veg Starter', True, True, 'chineese', True ),
( 4, 'Veg Manchurian Gravy', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/yhk9tbedm2hrzqf0flgx', 'Serves 1 | Savory and flavorful, this Chinese appetizer is sure to satisfy vegetarians and meat eaters alike.', 240, 'Veg Starter', True, False, 'chineese', True ),
( 5, 'Soyabin Chilly', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/4faea7262041e351c19d15eac6a765c9', 'Serves 1 | A crispy, flavor-packed Chinese appetizer.', 230, 'Veg Starter', True, False, 'chineese', True ),
( 6, 'Veg Manchow Soup', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wnblngkpq9i7gkrzsjv2', 'Medium Spicy | Serves 1 | A hot and spicy soup prepared from assorted veggies, flavoured with Indo-Chinese condimants.', 165, 'soup', True, False, 'chineese', True ),
( 7, 'Tomato Soup', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/8dee13f15190d74239ceea721a047616', 'Serves 1', 165, 'soup', True, True, 'chineese', True ),
( 8, 'Veg Coariander Soup', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/f38c9a842974e0daff8b20a861a3438f', 'Serves 1', 150, 'soup', True, True, 'chineese', True ),
( 9, 'Veg Maratha', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/dr4xa7opxrbilgt6sihl', 'Serves 1 | A flavorful vegetarian main course that will transport your taste buds to Maharashtra.', 230, 'Indian Main Course', True, True, 'curry', True ),
( 10, 'Veg Kadai', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/jwv7zya6sfazzoxqgxmx', 'Medium Spicy | Serves 1 | Flavorsome Indian vegetarian dish cooked with fresh herbs and aromatic spices.', 240, 'Indian Main Course', True, False, 'curry', True ),
( 11, 'Veg Kolhapuri', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/zv82wfx1tgdbin6qb0ve', 'Medium Spicy | Serves 1 | Delightfully delectable and flavorsome veg Kolhapuri, cooked to perfection in Indian spices and more.', 250, 'Indian Main Course', True, True, 'curry', True ),
( 12, 'Panner Butter Masala', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/kuvlm6bmjvn0qwukzctl', 'Medium Spicy | Serves 1 | Delightfully delectable and flavor-packed paneer butter masala, cooked to perfection - pair it with any Indian bread.', 280, 'Indian Main Course', True, True, 'curry', True ),
( 13, 'Veg Jaipur', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/kzdkqe9gdp6j6lcuf7cj', 'Serves 1 | A flavorful Punjabi dish, perfect for vegetarians.', 240, 'Indian Main Course', True, True, 'curry', True ),
( 14, 'Sev Bhaji', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ciptmm4ft75q5cev4iqs', 'Serves 1 | Shev bhaji is one such popular variety where spicy gathiya is topped over spicy coconut-based thin gravy', 230, 'Indian Main Course', True, True, 'curry', True ),
( 15, 'Veg Tufani', 'nan', 'Serves 1', 240, 'Indian Main Course', True, True, 'curry', True ),
( 16, 'Special Veg', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/lh6ziu28riwkgjunilkl', 'Serves 1 | |Chefs Special|', 410, 'Indian Main Course', True, False, 'curry', True ),
( 17, 'Mutter Panner', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/vqj8rqzz80ogckcu7yfn', 'Serves 1 | A rich and flavorful Indian curry with tender chunks of paneer cheese and sweet peas.', 245, 'Indian Main Course', True, False, 'curry', True ),
( 18, 'Kaju Masala/curry', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/hrbtyvrffsmyeticyjd2', 'Medium Spicy | Serves 1 | Aromatic and rich Indian main course with creamy cashews in a flavorful gravy.', 280, 'Indian Main Course', True, True, 'curry', True ),
( 19, 'Veg Hydrabadi', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/fm7zpw3fw133pq5n0lje', 'Serves 1 | A flavorful and aromatic Indian main course dish that is sure to delight veggie lovers.', 240, 'Indian Main Course', True, True, 'curry', True ),
( 20, 'Panner Tikka Masala', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/a1021da021dfd4e42f8072b048d4be56', 'Serves 1 | Paneer tikka masala is an Indian dish of marinated paneer served in a spiced gravy', 280, 'Indian Main Course', True, True, 'curry', True ),
( 21, 'Veg Jalfrzi', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/70af11cb9c8ee93f1a1e79e633bb8fe6', 'Serves 1', 240, 'Indian Main Course', True, True, 'curry', True ),
( 22, 'Panner Lachedar', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/e31d9e81d739ab799944b87b0f2e4af7', 'Serves 1 | Creamy and aromatic Indian vegetarian main course.', 260, 'Indian Main Course', True, True, 'curry', True ),
( 23, 'Panner Special', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/u0fbzhbxdly6zdiqjjop', 'Serves 1 | Indulge in a delectable vegetarian delight with this Paneer Special!', 310, 'Indian Main Course', True, True, 'curry', True ),
( 24, 'Veg Lahori', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wlen2ajv8kbslgr4awxj', 'Serves 1 | A flavorful vegetarian dish inspired by the cuisine of Lahore.', 250, 'Indian Main Course', True, True, 'curry', True ),
( 25, 'Panner Musalam', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ee0urmu8t8ixa64q1p8o', 'Serves 1 | A rich and creamy Indian main course with tender paneer in a fragrant sauce.', 310, 'Indian Main Course', True, False, 'curry', True ),
( 26, 'Kaju Panner Masala', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/leapytltdghvwnmhrbzg', 'Serves 1 | A creamy Indian curry with tender paneer and crunchy cashews.', 280, 'Indian Main Course', True, False, 'curry', True ),
( 27, 'Lasooni', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/nwmqdugofcigf3at0a05', 'Serves 1', 190, 'Indian Main Course', True, False, 'curry', True ),
( 28, 'Cheese Masala', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/whymswjezybiphungbtw', 'Serves 1', 280, 'Indian Main Course', True, False, 'curry', True ),
( 29, 'Tawa Veg', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/yynar93dwxeu0dg2cnhs', 'Serves 1 | A sizzling vegetarian delight perfect for any meal.', 240, 'Indian Main Course', True, False, 'curry', True ),
( 30, 'Kaju Masala', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/jkfxvmsacg3fg5xkgbnu', 'Serves 1 | Kaju,garevy', 280, 'Indian Main Course', True, False, 'curry', True ),
( 31, 'Dal fry', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/opgqdohiaeunng63dwlt', 'Medium Spicy | Serves 1 | Flavor-packed and all-time loved dal fry, cooked to perfection in mild Indian spices and more.', 180, 'Dal', True, False, 'curry', True ),
( 32, 'Dal Tadka', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ebzvgsaplvrrn23jjv2s', 'Medium Spicy | Serves 1 | Flavor-packed and all-time loved dal tadka, cooked to perfection in mild Indian spices and more.', 190, 'Dal', True, False, 'curry', True ),
( 33, 'Dal Makhani', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/vhw4umhbar1nr0yatfdo', 'Serves 1 | A decadently indulgent dish prepared by cooking black lentil and red kidney beans in a cream and butter based gravy.', 210, 'Dal', True, False, 'curry', True ),
( 34, 'Veg Fried Rice', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/dcsbmy3eia9ektr7b1v6', 'Serves 1 | A deliciously aromatic and flavorful dish prepared from rice and stir-fried vegetables.', 240, 'Chiniese Rice & Noodles', True, False, 'chineese', True ),
( 35, 'Veg Hakka Noodles', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/fkz1a0kqxjqqhsnm9qqe', 'Serves 1 | A medley of colorful vegetables stir-fried with soft, slurpy noodles.', 240, 'Chiniese Rice & Noodles', True, False, 'chineese', True ),
( 36, 'Tripal sezwan Fried Rice', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/oba4orrcaihers6vznfe', 'Serves 1 | Schezwan fried rice is a zesty vegetarian and vegan stir-fried rice variant that features a bold and spicy Schezwan sauce loaded with healthy mix vegetables, aromatics and herbs', 290, 'Chiniese Rice & Noodles', True, False, 'chineese', True ),
( 37, 'Thai Curry With rice Red Sauce', 'nan', 'Serves 1 | Rice basil mushroom baby corn green sauce', 330, 'Chiniese Rice & Noodles', True, False, 'chineese', True ),
( 38, 'Steam Rice', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/96eace238f3528fd4a30d1d7e80d0844', 'Serves 1 | Fluffy and fragrant rice cooked to perfection and served half-portion for a perfect vegan meal.', 90, 'Rice', True, True, 'rice', True ),
( 39, 'Veg Biryani ', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/rwnkrdtnusqdkyjssahq', 'Serves 1 | Rice and assorted veggies cooked in a fragrant and flavorful masala seasoned with Indian whole spices.', 240, 'Rice', True, True, 'rice', True ),
( 40, 'Dal Khichdi', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/tgwkcp5ynhpuvk30lb1m', 'Serves 1 | A delicious and comforting meal, made from rice and moong lentils.', 210, 'Rice', True, True, 'rice', True ),
( 41, 'anda Curry', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/966dd46645ff28a9bdef8067a303d852', 'Serves 1', 300, 'Veg Clay Over Appetizer', True, True, 'Tikka', True ),
( 42, 'Paneer Theecha ', 'nan', 'Serves 1', 280, 'Veg Clay Over Appetizer', True, True, 'TIkka', True ),
( 43, 'Veg seekh', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/4e5fc7d2600c7e84e2ddeddaec6ff161', 'Serves 1', 240, 'Veg Clay Over Appetizer', True, True, 'TIkka', True ),
( 44, 'Mushroom Tikka', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/zngxwgidb11pylpaalvb', 'Serves 1', 230, 'Veg Clay Over Appetizer', True, True, 'TIkka', True ),
( 45, 'Paneer Tikka Dry', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/2acdef990b1ee8d5bdefe870e6497126', 'Serves 1 | Paneer ,onion tomato,capsicam', 250, 'Veg Clay Over Appetizer', True, True, 'TIkka', True ),
( 46, 'Lassi Sweet', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/jhcag9ynigqqvbdhe4ew', 'Serves 1 | A refreshing and sweet salad that will satisfy your craving for something sweet and healthy.', 120, 'Hot Cold Beverage', True, True, 'Beverages', True ),
( 47, 'Butter Milk', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/g5pluclfznpaq0hojhui', 'Serves 1 | Tangy and refreshing, perfect for beating the heat.', 70, 'Hot Cold Beverage', True, True, 'Beverages', True ),
( 48, 'Butter Milk Masala', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/a9d5340a5b2996a14a74e4db7b5bb76d', 'Serves 1 | A delightful buttermilk made from yogurt mixed with salt to enhance its flavor- refreshing drink for your thirst.', 80, 'Hot Cold Beverage', True, False, 'Beverages', True ),
( 49, 'Drinking water', 'http://media-assets.swiggy.com/swiggy/image/uplo', 'Serves 1 | A refreshing citrus-filled drink, perfect for cooling down on a hot day.', 30, 'Hot Cold Beverage', True, False, 'Beverages', True ),
( 50, 'Fresh Lime Soda', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/igotoocq0az5te0ft1kc', 'nan', 50, 'Hot Cold Beverage', True, False, 'Beverages', True ),
( 51, 'Fresh Fruit Juice', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/fb04e080e4550987b1cf0f9e89a4ec59', 'nan', 150, 'Hot Cold Beverage', True, True, 'Beverages', True ),
( 52, 'Tea', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/bkpzgp8oixozb5kzxfw2', 'Serves 1 | A hot and comforting beverage perfect for any time of day.', 40, 'Hot Cold Beverage', True, True, 'Beverages', True ),
( 53, 'Cold Drinks', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/qu21djqqgzozije2qa6m', 'nan', 35, 'Hot Cold Beverage', True, True, 'Beverages', True ),
( 54, 'Cheese Sandwich', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/e1ohzwatcm4uglsd3q0h', 'Serves 1', 120, 'Sandwich', True, False, 'sandwich', True ),
( 55, 'Chole Bhature', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ytftzfuehowxkmctjfvo', 'Serves 1 | A classic Punjabi combo consisting of fluffy bathura served with thick and indulgent chickpea gravy.', 200, 'Sandwich', True, True, 'sandwich', True ),
( 56, 'Veg Cutlet', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/kio6trem7ju4in0jcrco', 'Serves 1 | Crispy nuggets bursting with flavors, perfect for vegetarians.', 170, 'Sandwich', True, True, 'sandwich', True ),
( 57, 'Veg sandwiches', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/3e0d5b54975f403e9bcba126855830be', 'Serves 1', 95, 'Sandwich', True, True, 'sandwich', True ),
( 58, 'Green Salad', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/a2oiukbdv9cu4btdkjap', 'Serves 1 | A refreshing and nutritious medley of fresh greens and vegetables tossed together in a light dressing.', 120, 'Salad', True, True, 'salad', True ),
( 59, 'Ice Cream', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/edcb4ec51392bc498444f761df930a9b', 'Serves 1', 120, 'Dessert', True, True, ' dessert', True ),
( 60, 'Gulab Jamun', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/qsej3ecxxd8xq9kzgg4s', 'Serves 1', 90, 'Dessert', True, True, 'chicken', True ),
( 61, 'Chicken Banjara Kebab', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/y1rzfo8pmfznyf9ylxfw', 'Serves 1 | Juicy grilled chicken seasoned with aromatic spices.', 420, 'Non-veg Starters', True, True, 'chicken', False ),
( 62, 'Chicken Pahadi Kebab', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/gtfjawazdyz4jtoiwt1v', 'Serves 1 | Succulent chicken kebabs bursting with aromatic herbs and spices.', 420, 'Non-veg Starters', True, True, 'chicken', False ),
( 63, 'chicken Lollipop', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/nnmvgb602a2gphyun4lv', 'Serves 1 | Everyones favorite home-spiced chicken lollipop served straight from the tandoor.', 220, 'Non-veg Starters', True, True, 'chicken', False ),
( 64, 'Chicken Lasuni Lollipop', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ekb19z8mwfw29ur2fyk8', 'Serves 1', 345, 'Non-veg Starters', True, False, 'chicken', False ),
( 65, 'Chicken Tandoori', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/dmnvbjemxitfegxn010n', 'Serves 1 | Tandoor-cooked chicken chunks marinated in a yogurt and chiilli based masala; served with onions and chutney.', 330, 'Non-veg Starters', True, False, 'chicken', False ),
( 66, 'Chicken Tikka fry', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ag3wutpet1a8bxremnmi', 'Serves 1 | Tender pieces of chicken, cooked to perfection and coated with a flavorful crispy coating.', 200, 'Non-veg Starters', True, False, 'chicken', False ),
( 67, 'Chicken Thai Kebab', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/7b7b3d4ea4ea67e447635430ce59c08e', 'Serves 1', 435, 'Non-veg Starters', True, False, 'chicken', False ),
( 68, 'Chicken Masala', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/aethdcuil6ndioq31vng', 'Serves 1 | Chicken masala is a Indian dish made with chicken, spices, herbs, onions and tomatoes', 220, 'Main Course', True, False, 'chicken', False ),
( 69, 'Chicken Maratha', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/sedmtaljhqx81k0dkgyf', 'Serves 1 | Delicious Chicken Curry Bathed In A Lip-Smacking Blend Of Spices And Rich Flavours.(6Pc)', 325, 'Main Course', True, False, 'chicken', False ),
( 70, 'Chicken Spicy', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/j5pk4zq3nfaoxhw7jvru', 'Medium Spicy | Serves 1', 330, 'Main Course', True, False, 'chicken', False ),
( 71, 'Chicken Kolhapuri Handi', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/e9tdghtg2oht0aikwlft', 'Serves 1 | A mouth-watering chicken dish from India featuring tender meat in a rich, flavorful sauce.', 480, 'Main Course', True, True, 'chicken', False ),
( 72, 'Butter Chicken', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/bmwk1fwtnik0fxfctl1d', 'Serves 1 | Butter chicken is prepared with marinated chicken thats first grilled and then served in a rich gravy', 380, 'Main Course', True, True, 'chicken', False ),
( 73, 'Chicken Pahadi  ', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/58bca189bd95d9e7ad8899146daefc42', 'Serves 1 | A succulent Tandoor chicken, flavored with aromatic herbs and cooked to tender perfection.', 210, 'Main Course', True, True, 'chicken', False ),
( 74, 'Chicken Hydrabadi', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/e68a6ad32af497346e3375a3e68c0a92', 'Serves 1 | A savory non-vegetarian main course to delight your taste buds.', 210, 'Main Course', True, True, 'egg', False ),
( 75, 'Anda Curry', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ezeu6xfiisa3neyb25vy', 'Serves 1 | A flavorful egg-based dish perfect for meatless meals.', 155, 'Main Course', True, True, 'egg', False ),
( 76, 'Chicken Biryani', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/v2az0zsbdts2gq68t6vz', 'Serves 1 | Richly flavored aromatic rice layered with marinated chicken pieces in a delicate blend of whole spices.', 250, 'Rice And Biryani', True, True, 'biryani', False ),
( 77, 'Egg Biryani', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ow9iwc74gpr7tn7atuhl', 'Serves 1 | Healthy yet wholesome boiled eggs covered in flavor-packed masala and slow cooked rice.', 200, 'Rice And Biryani', True, True, 'gg', False ),
( 78, 'Egg Pulao', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/cb8fcf410868009fde72310a74285524', 'Serves 1 | Egg and flavored rice slow cooked in a delicious mix of homemade masala flavored with aromatic spices; serve with curry and salad.', 190, 'Rice And Biryani', True, True, 'egg', False ),
( 79, 'Chicken Pulao', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/cb8fcf410868009fde72310a74285524', 'Serves 1 | Simple, aromatic, and healthy meal of juicy chicken stir fried with rice.', 220, 'Rice And Biryani', True, False, 'soup', False ),
( 80, 'Chicken Manchow Soup', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/cb8fcf410868009fde72310a74285524', 'Serves 1 | Exremly tasty and flavoursome soup that has shredded chicken and fresh veggies as the main ingredients', 190, 'Soup', True, True, 'soup', False ),
( 81, 'Chicken Hot & Sour', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/cb8fcf410868009fde72310a74285524', 'Serves 1 | Loaded with spicy and tangy flavours,this chicken soup tasters irresistibly yummy.', 190, 'Soup', True, False, 'soup', False ),
( 82, 'Chicken Sweet Corn Soup', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/cb8fcf410868009fde72310a74285524', 'Serves 1 | A perfectly hearty soup that combines tender chicken and sweet corn in a warm and savory broth.', 190, 'Soup', True, False, 'nan', False ),
( 83, 'Chicken Clear Soup', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/cb8fcf410868009fde72310a74285524', 'Serves 1 | A light, flavorful soup featuring tender chunks of chicken.

', 170, 'Soup', True, True, 'soup', False ),
( 84, 'kaju pista kulfee', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/3d4fbb9ad75560b477b923815b0f6c40', 'A rich, nutty and creamy treat with a perfect balance of cashews and pistachios. Serves 1', 50, 'Dessert', True, True, 'icecream', True ),
( 85, 'Kala jamun', 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/e97aba46833f1595f4f34483656b5633', 'A mouth-watering dessert with a soft, syrupy texture and a rich, sweet taste.', 120, 'Dessert', True, True, 'DESSERT', True );