# postgraphile-plugin-omit-read-root

This plugin allows you to omit from the root graphql query object the read property generated by a
unique constraint or a primary key constraint.

## Example

With the following schema

```sql
create table classroom (
    id int primary key,
    name text
);
create table teacher (
    id int primary key,
    classroom_id int not null references classroom(id),
    email text unique
);
```

the graphql generated would include a `teacherById` field on the root query object.

Omitting `readRoot` via a smart tag on the primary key constraint will remove the `teacherById`
field from the root query object.

For example, via a smart comment

```sql
comment on constraint teacher_pkey on teacher is E'@omit readRoot';
```

It works identically for unique constraints, such as that on `teacher.email` in the above example.

## Usage

This is a simple plugin. You can just copy it into your project and modify as needed. You can
install it using npm or yarn:

```sh
yarn add postgraphile-plugin-omit-read-root
```

```js
const { OmitReadRootPlugin } = require('postgraphile-plugin-omit-read-root')
```

## Compatibility

This plugin has no dependencies. It was tested with Postgraphile v4.12.9.