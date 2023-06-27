CREATE TABLE items_purchasing (
	id INT AUTO_INCREMENT,
	item_name VARCHAR(4096) NOT NULL,
	unit VARCHAR(4096) NOT NULL,
	item_price INT NOT NULL,
	item_count INT NOT NULL,
	item_for INT NOT NULL,
	purchased_date DATETIME,
	PRIMARY KEY (id)
);
