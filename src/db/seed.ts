import path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "./connection.ts";
import { users, habits, entries, tags, habitTags } from "./schema.ts";

const usersData = [
  {
    email: "test@test.com",
    username: "test",
    password: "test",
    firstName: "Test",
    lastName: "Test",
  },
];

const tagsData = [
  {
    name: "Test Tag",
    color: "#000000",
  },
];

const seed = async () => {
  console.log("Seeding database... 🌱");

  try {
    console.log("Clearing existing data... 🧹");
    await db.delete(habitTags);
    await db.delete(entries);
    await db.delete(habits);
    await db.delete(tags);
    await db.delete(users);

    console.log("Inserting users... 🧑‍🤝‍🧑");
    const [createdUser] = await db.insert(users).values(usersData).returning();

    console.log("Inserting tags... 📌");
    const [testTag] = await db.insert(tags).values(tagsData).returning();

    console.log("Inserting habits... 💪");

    const [testHabit] = await db
      .insert(habits)
      .values({
        userId: createdUser.id,
        name: "Test Habit",
        description: "Test Description",
        frequency: "daily",
      })
      .returning();

    console.log("Inserting habit tags... 🔖");

    await db.insert(habitTags).values({
      habitId: testHabit.id,
      tagId: testTag.id,
    });

    console.log("Inserting completed entries... 📝");

    const today = new Date();
    today.setHours(12, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      await db.insert(entries).values({
        habitId: testHabit.id,
        completionDate: date,
        notes: `Completed on ${date.toLocaleDateString()} for test habit`,
      });
      console.log(
        `Inserted entry for ${date.toLocaleDateString()} 📝 ${testHabit.id}`,
      );
    }

    console.log("Seeding completed! 🌱");
    console.log(
      "You can now start the server and login with the following credentials: 🔑",
    );
    console.log(
      "-------------------------------- user credentials --------------------------------",
    );
    console.log(`Email: ${usersData[0].email}`);
    console.log(`Password: ${usersData[0].password}`);
    console.log(
      "-------------------------------- user credentials --------------------------------",
    );
    console.log("closing the process...");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database: ", error);
    process.exit(1);
  }
};

const isMain =
  Boolean(process.argv[1]) &&
  path.resolve(fileURLToPath(import.meta.url)) ===
    path.resolve(process.argv[1]);

if (isMain) {
  seed();
}

export default seed;
