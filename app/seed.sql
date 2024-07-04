insert into
  roles (id)
values
  ('student'),
  ('teacher'),
  ('administrator');

insert into
  membership_roles (id)
values
  ('student_member'),
  ('teacher_member');

insert into
  users (id, email, name)
values
  (
    'ywic7vn846132k1v183jewd6',
    'admin@carambaapp.com',
    'admin'
  ),
  (
    'm4t0hih9kmcv38fp8fpuc73m',
    'carambaapp@mail.com',
    ''
  ),
  (
    'a4ml32u8eg3x2cjrbjoabtkh',
    'carambaapp1@mail.com',
    ''
  ),
  (
    's5f41ih71cx5a2pavc6r0gc4',
    'carambaapp2@mail.com',
    'Teacher 1'
  ),
  (
    'ehwgtbl0qk1medtlugma8li0',
    'carambaapp3@mail.com',
    'Teacher 2'
  );

insert into
  users_to_roles (user_id, role)
values
  (
    (
      select
        id
      from
        users
      where
        email = 'admin@carambaapp.com'
    ),
    'administrator'
  ),
  (
    (
      select
        id
      from
        users
      where
        email = 'admin@carambaapp.com'
    ),
    'teacher'
  ),
  (
    (
      select
        id
      from
        users
      where
        email = 'carambaapp@mail.com'
    ),
    'student'
  ),
  (
    (
      select
        id
      from
        users
      where
        email = 'carambaapp1@mail.com'
    ),
    'student'
  ),
  (
    (
      select
        id
      from
        users
      where
        email = 'carambaapp2@mail.com'
    ),
    'teacher'
  ),
  (
    (
      select
        id
      from
        users
      where
        email = 'carambaapp3@mail.com'
    ),
    'teacher'
  );

insert into
  organizations (id, name, public)
values
  (
    'x1vdwnz4w2dj1eyouan3m6aw',
    'Caramba Publica',
    true
  ),
  (
    'lopezkvuil8q0yw7qmr7mm7w',
    'Caramba Privada',
    false
  ),
  (
    'vqtdswramjsg4xrhf51n564h',
    'Caramba Privada1',
    false
  );

insert into
  memberships (id, organization_id, user_id, membership_role)
values
  (
    'c7s1d4043evrgipr4j3qmnai',
    (
      select
        id
      from
        organizations
      where
        name = 'Caramba Publica'
    ),
    (
      select
        id
      from
        users
      where
        email = 'admin@carambaapp.com'
    ),
    'teacher_member'
  ),
  (
    'jkzno11mdqhvg4oixvysqqtp',
    (
      select
        id
      from
        organizations
      where
        name = 'Caramba Privada'
    ),
    (
      select
        id
      from
        users
      where
        email = 'carambaapp2@mail.com'
    ),
    'teacher_member'
  ),
  (
    'wfbbddqezn1wzksccf8s0msx',
    (
      select
        id
      from
        organizations
      where
        name = 'Caramba Privada'
    ),
    (
      select
        id
      from
        users
      where
        email = 'carambaapp@mail.com'
    ),
    'student_member'
  ),
  (
    'w7wjb4yrd1r1p3sw0gw86dgb',
    (
      select
        id
      from
        organizations
      where
        name = 'Caramba Privada1'
    ),
    (
      select
        id
      from
        users
      where
        email = 'carambaapp3@mail.com'
    ),
    'teacher_member'
  ),
  (
    'l632gibo8bn7756unk0k2vl2',
    (
      select
        id
      from
        organizations
      where
        name = 'Caramba Privada1'
    ),
    (
      select
        id
      from
        users
      where
        email = 'carambaapp1@mail.com'
    ),
    'student_member'
  );

insert into
  courses (id, name, description, organization_id)
values
  (
    'kgo3a13lnw7hfhit8jlhjato',
    'Vocabulario - Vocabulary',
    'Esa palabra no es parte de mi vocabulario. - That word is not part of my vocabulary.',
    (
      select
        id
      from
        organizations
      where
        name = 'Caramba Publica'
    )
  ),
  (
    'u9d2puc8rnm3qzemz3b89tan',
    'Gramática - Grammar',
    'Puedo hablar un poquito de francés, pero la gramática me confunde. - I can speak a bit of French, but the grammar confuses me.',
    (
      select
        id
      from
        organizations
      where
        name = 'Caramba Privada'
    )
  ),
  (
    's8skia9io6gt473snixfr8hx',
    'Coloquial - Conversational',
    'Estamos buscando contratar a alguien con buen conocimiento de francés coloquial. - We are looking to hire someone with good knowledge of conversational French.',
    (
      select
        id
      from
        organizations
      where
        name = 'Caramba Privada'
    )
  ),
  (
    'cde4vmgjs5pj7rrjinjiq46x',
    'Tecnología - Technology',
    'A la tecnología rara vez se le saca su máximo provecho. - Technology is rarely used to its fullest potential.',
    (
      select
        id
      from
        organizations
      where
        name = 'Caramba Privada1'
    )
  );

insert into
  lessons (id, name, excerpt, ordering, course_id)
values
  (
    'brtxko3l9n613zyusr9872l1',
    'Word Bridge',
    'Crossing language barriers.',
    1.0,
    'kgo3a13lnw7hfhit8jlhjato'
  ),
  (
    'lhdjeswl2vb25zes5cw0so06',
    'Linguistic Leap',
    'From Spanish to English and vice versa.',
    2.0,
    'kgo3a13lnw7hfhit8jlhjato'
  ),
  (
    'eh1k4mtz1ebcsnokfxk70bvb',
    'Vocabulary Voyage',
    'Navigating between languages',
    3.0,
    'kgo3a13lnw7hfhit8jlhjato'
  ),
  (
    'wyprkwcnjdtr9jjyj9ab2qeb',
    'Translation Station',
    'Quick word switches',
    4.0,
    'kgo3a13lnw7hfhit8jlhjato'
  ),
  (
    'scejdqvk7t11qsmnhzhyfm41',
    'Adjective Alignment',
    'Describing Words in Two Tongues',
    1.0,
    'u9d2puc8rnm3qzemz3b89tan'
  ),
  (
    'p0q8hucgjqh7z1p7w9r7p9lx',
    'Conjugation Constellation',
    'Mapping Verb Patterns',
    2.0,
    'u9d2puc8rnm3qzemz3b89tan'
  ),
  (
    'kzyzf7pliz4rgtnlyqls9tc8',
    'Small Talk Swap',
    'Casual Conversations in Two Tongues',
    1.0,
    's8skia9io6gt473snixfr8hx'
  ),
  (
    'cu2gzk09b6x9rzek6m3wrnbz',
    'Dining Dialogue',
    'Restaurant Talk',
    2.0,
    's8skia9io6gt473snixfr8hx'
  ),
  (
    'lbmleza0x3kbfzd44gu4ch79',
    'Tech Talk',
    'Bridging Digital Divides',
    1.0,
    'cde4vmgjs5pj7rrjinjiq46x'
  ),
  (
    'ahtxsa80au5v8ihqdoxu9otu',
    'Coding Conversations',
    'Programming Terms Translated',
    2.0,
    'cde4vmgjs5pj7rrjinjiq46x'
  ),
  (
    'uw6r5bmxcu8ru0mkk68876l1',
    'Software Speak',
    'Application Lingo Across Borders',
    3.0,
    'cde4vmgjs5pj7rrjinjiq46x'
  );
