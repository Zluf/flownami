
import { findTaskById } from "./service.ts";
import { Board } from "../board/Board.ts";
import { assertArrayIncludes, assertEquals } from "@std/assert";
import { spy } from "@std/testing/mock";
import { TaskRepo, writeTasks, readTasks } from "../data.ts";
import { Task } from "../tasks/Task.ts";
import { generateBoard } from "../board/service.ts";

Deno.test("find task by ID", async () => {
  const fakeTask: Task = {
    id: "some-id",
    name: "Some Name",
    column: "To Do",
  };

  const tasks = [fakeTask];
  
  // BU data to restore at end of test
  // ?? How to use mock instead ??
  const dataBackup = await readTasks(); 

  await writeTasks(tasks); // Mock writing tasks to storage

  // Act
  const result = await findTaskById(fakeTask.id);

  // Assert
  assertEquals(result, fakeTask);

  // Cleanup
  await writeTasks(dataBackup); // Clear tasks after test

});
