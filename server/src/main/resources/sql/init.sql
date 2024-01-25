INSERT INTO messenger.messages (id, date, message,  receiver_name, sender_name)
VALUES (1, '2023-12-12T20:05:01.313Z', 'Hi Katya!', 'katya', 'oleg');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (2, '2023-12-12T20:05:02.313Z', 'Hi Oleg!', 'oleg', 'katya');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (3, '2023-12-12T20:05:03.313Z', 'How are you Oleg?', 'oleg', 'katya');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (4, '2023-12-12T20:05:04.313Z', 'I am fine, thanks for question Katya!', 'oleg', 'katya');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (5, '2023-12-12T20:05:05.313Z', 'How are you Katya?', 'katya', 'oleg');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (6, '2023-12-12T20:05:06.313Z', 'I am fine, thanks for question Oleg!', 'oleg', 'katya');




INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (7, '2023-12-12T20:05:02.313Z', 'Hi Oleg!', 'oleg', 'olga');

INSERT INTO messenger.messages (id, date, message,  receiver_name, sender_name)
VALUES (8, '2023-12-12T20:05:03.313Z', 'Hi Olga!', 'olga', 'oleg');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (9, '2023-12-12T20:05:03.313Z', 'How are you Olga?', 'olga', 'oleg');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (10, '2023-12-12T20:05:04.313Z', 'I am fine, thanks Oleg!', 'oleg', 'olga');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (11, '2023-12-12T20:05:05.313Z', 'How is your mom?', 'oleg', 'olga');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (12, '2023-12-12T20:05:06.313Z', 'She is doing well!', 'olga', 'oleg');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (13, '2023-12-12T20:05:07.313Z', 'I need go. See you later!', 'oleg', 'olga');


INSERT INTO messenger.messages (id, date, message,  receiver_name, sender_name)
VALUES (14, '2023-12-12T20:05:03.313Z', 'Hi Volodymyr!', 'volodymyr', 'oleg');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (15, '2023-12-12T20:05:03.313Z', 'Hi Oleg!', 'oleg', 'volodymyr');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (16, '2023-12-12T20:05:04.313Z', 'How is your pet project?', 'oleg', 'volodymyr');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (17, '2023-12-12T20:05:05.313Z', 'You\'ll see it soon)', 'volodymyr', 'oleg');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (18, '2023-12-12T20:05:06.313Z', 'Ok. let\'s go!', 'oleg', 'volodymyr');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (19, '2023-12-12T20:05:07.313Z', 'Good job, Oleg!', 'oleg', 'volodymyr');

INSERT INTO messenger.messages (id, date, message, receiver_name, sender_name)
VALUES (20, '2023-12-12T20:05:07.313Z', 'Thank you!!!', 'volodymyr', 'oleg');


INSERT INTO messenger.chats (id, receiver_name, sender_name)
VALUES (1, 'oleg', 'katya');

INSERT INTO messenger.chats (id, receiver_name, sender_name)
VALUES (2, 'oleg', 'olga');

INSERT INTO messenger.chats (id, receiver_name, sender_name)
VALUES (3, 'oleg', 'volodymyr');


INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (1, 1);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (1, 2);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (1, 3);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (1, 4);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (1, 5);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (1, 6);


INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (2, 7);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (2, 8);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (2, 9);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (2, 10);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (2, 11);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (2, 12);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (2, 13);


INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (3, 14);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (3, 15);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (3, 16);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (3, 17);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (3, 18);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (3, 19);

INSERT INTO messenger.chats_messages (chat_id, messages_id)
VALUES (3, 20);
