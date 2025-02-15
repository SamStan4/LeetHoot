CREATE TABLE IF NOT EXISTS _game_table (
    game_id SERIAL,
    host_name VARCHAR(256) UNIQUE NOT NULL,
    PRIMARY KEY (game_id)
);