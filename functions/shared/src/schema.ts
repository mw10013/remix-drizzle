import { Status } from '@paddle/paddle-node-sdk'
import { createId } from '@paralleldrive/cuid2'
import { relations, sql } from 'drizzle-orm'
import {
  index,
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'

export type Environment = 'production' | 'preview' | 'local'

export function asEnvironment(environment: Environment) {
  return environment
}

// MUST align with roles database table
export type Role = 'student' | 'teacher' | 'administrator'

export function asRole(role: Role) {
  return role
}

export const roles = sqliteTable('roles', {
  id: text('id').primaryKey(),
})

export const rolesRelations = relations(roles, ({ many }) => ({
  usersToRoles: many(usersToRoles),
}))

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$default(createId),
  email: text('email').notNull().unique(),
  name: text('name').notNull().default(''),
  createdAt: integer('created_at', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
})

export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert

export const usersRelations = relations(users, ({ many, one }) => ({
  usersToRoles: many(usersToRoles),
  customer: one(customers),
}))

export const usersToRoles = sqliteTable(
  'users_to_roles',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    role: text('role')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.role] }),
  })
)

export const usersToRolesRelations = relations(usersToRoles, ({ one }) => ({
  user: one(users, {
    fields: [usersToRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [usersToRoles.role],
    references: [roles.id],
  }),
}))

export function asCustomerStatus(status: Status) {
  return status
}

export const customers = sqliteTable(
  'customers',
  {
    id: text('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: 'cascade' }),
    status: text('status').notNull(),
    marketingConsent: integer('marketing_consent', { mode: 'boolean' })
      .notNull()
      .default(false),
    lockedAt: integer('locked_at', { mode: 'timestamp_ms' }),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (t) => ({
    customersUserIdIndex: index('customers_user_id_index').on(t.userId),
    customersUpdatedAtIndex: index('customers_updated_at_index').on(
      t.updatedAt
    ),
  })
)

export type Customer = typeof customers.$inferInsert
export type InsertCustomer = typeof customers.$inferInsert

export const customersRelations = relations(customers, ({ one, many }) => ({
  user: one(users, {
    fields: [customers.userId],
    references: [users.id],
  }),
  subscriptions: many(subscriptions),
}))

export const products = sqliteTable(
  'products',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    status: text('status').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (t) => ({
    productsUpdatedAtIndex: index('products_updated_at_index').on(t.updatedAt),
  })
)

export type Product = typeof products.$inferSelect
export type InsertProduct = typeof products.$inferInsert

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(prices),
}))

export const prices = sqliteTable(
  'prices',
  {
    id: text('id').primaryKey(),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    description: text('description').notNull(),
    name: text('name'),
    unitPriceAmount: integer('unit_price_amount').notNull(),
    status: text('status').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (t) => ({
    pricesProductIdIndex: index('prices_product_id_index').on(t.productId),
    pricesUpdatedAtIndex: index('prices_updated_at_index').on(t.updatedAt),
  })
)

export type Price = typeof prices.$inferSelect
export type InsertPrice = typeof prices.$inferInsert

export const pricesRelations = relations(prices, ({ one }) => ({
  product: one(products, {
    fields: [prices.productId],
    references: [products.id],
  }),
}))

// https://developer.paddle.com/build/subscriptions/provision-access-webhooks#recommended-webhooks
// https://developer.paddle.com/build/lifecycle/subscription-creation#workflow-provisioning
// Where status is trialing, active, or past_due, customers should have full access to your app.
// Check subscription.items[].price.product_id to check the products that your customer has paid for.

export const subscriptions = sqliteTable(
  'subscriptions',
  {
    id: text('id').primaryKey(),
    status: text('status').notNull(),
    customerId: text('customer_id')
      .notNull()
      .unique()
      .references(() => customers.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  },
  (t) => ({
    subscriptionsCustomerIdIndex: index('subscriptions_customer_id_index').on(
      t.customerId
    ),
    subscriptionsUpdatedAtIndex: index('subscriptions_updated_at_index').on(
      t.updatedAt
    ),
  })
)

export type Subscription = typeof subscriptions.$inferSelect
export type InsertSubscription = typeof subscriptions.$inferInsert

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  customer: one(customers, {
    fields: [subscriptions.customerId],
    references: [customers.id],
  }),
}))

export const organizations = sqliteTable(
  'organizations',
  {
    id: text('id').primaryKey().$default(createId),
    name: text('name').notNull().unique(),
    public: integer('public', { mode: 'boolean' }).notNull().default(false),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
  },
  (t) => ({
    organizationsNameIndex: index('organizations_name_index').on(t.name),
    organizationsPublicIndex: index('organizations_public_index').on(t.public),
  })
)

export const organizationsRelations = relations(organizations, ({ many }) => ({
  memberships: many(memberships),
  courses: many(courses),
}))

// Must align with membership roles table
export type MembershipRole = 'student_member' | 'teacher_member'

export function asMembershipRole(role: MembershipRole) {
  return role
}

export const membershipRoles = sqliteTable('membership_roles', {
  id: text('id').primaryKey(),
})

export const memberships = sqliteTable(
  'memberships',
  {
    id: text('id').primaryKey().$default(createId),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    membershipRole: text('membership_role')
      .notNull()
      .references(() => membershipRoles.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    // membershipsOrganizationIdIndex: index(
    //   'memberships_organization_id_index'
    // ).on(t.organizationId),
    // membershipsUserIdIndex: index('memberships_user_id_index').on(t.userId),
    membershipsUniqueOrganizationIdAndUserIdIndex: uniqueIndex(
      'memberships_unique_organization_id_and_user_id_index'
    ).on(t.organizationId, t.userId),
  })
)

export const membershipsRelations = relations(memberships, ({ one }) => ({
  organization: one(organizations, {
    fields: [memberships.organizationId],
    references: [organizations.id],
  }),
  user: one(users, {
    fields: [memberships.userId],
    references: [users.id],
  }),
}))

export const courses = sqliteTable(
  'courses',
  {
    id: text('id').primaryKey().$default(createId),
    name: text('name').notNull(),
    description: text('description').notNull().default(''),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    coursesUniqueOrganizationIdAndNameIndex: uniqueIndex(
      'courses_unique_organization_id_and_name_index'
    ).on(t.organizationId, t.name),
    // coursesNameIndex: index('courses_name_index').on(t.name),
    // coursesOrganizationIdIndex: index('courses_organization_id_index').on(
    //   t.organizationId
    // ),
  })
)

export const coursesRelations = relations(courses, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [courses.organizationId],
    references: [organizations.id],
  }),
  lessons: many(lessons),
}))

export const lessons = sqliteTable(
  'lessons',
  {
    id: text('id').primaryKey().$default(createId),
    name: text('name').notNull(),
    excerpt: text('excerpt').notNull().default(''),
    ordering: real('ordering').notNull(),
    courseId: text('course_id')
      .notNull()
      .references(() => courses.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    lessonsCourseIdAndOrderIndex: index('lessons_course_id_and_order_index').on(
      t.courseId,
      t.ordering
    ),
  })
)

export const lessonsRelations = relations(lessons, ({ one }) => ({
  course: one(courses, {
    fields: [lessons.courseId],
    references: [courses.id],
  }),
}))

export { createId }
