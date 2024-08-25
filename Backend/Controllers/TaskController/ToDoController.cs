using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Backend.Models.Category;
using Backend.Models.DTOs;
using Backend.Models.Task;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Backend.Controllers.TaskController
{
	[ApiController]
	[Authorize]
	[Route("/api/todoitems")]
	public class ToDoController : ControllerBase
	{
		private readonly ApplicationDbContext context;
		private readonly UserManager<User> userManager;

		public ToDoController(ApplicationDbContext context, UserManager<User> userManager)
		{
			this.context = context;
			this.userManager = userManager;
		}
		// Get Todos
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ToDoItemsDTO>>> GetToDoItems()
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var items = await context
				.ToDoItems.Where(t => t.UserId == userId)
				.Select(t => new ToDoItemsDTO
				{
					TaskId = t.TaskId,
					TaskName = t.TaskName,
					TaskDescription = t.TaskDescription,
					DueDate = t.DueDate.HasValue ? t.DueDate.Value : DateTime.MinValue,
					Priority = t.Priority,
					IsCompleted = t.IsCompleted,
					CategoryId = t.CategoryId.HasValue ? (int)t.CategoryId : 0,
					DateCreated = t.DateCreated,
					UserId = t.UserId,
					Subtasks = t.Subtasks,
					Recurrence = t.Recurrence,
					Attachments = t.Attachments
				})
				.ToListAsync();

			return Ok(items);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<ToDoItem>> GetToDoItem(int id)
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var item = await context
				.ToDoItems.Where(t => t.UserId == userId && t.TaskId == id)
				.Select(t => new ToDoItemsDTO
				{
					TaskId = t.TaskId,
					TaskName = t.TaskName,
					TaskDescription = t.TaskDescription,
					DueDate = t.DueDate.HasValue ? t.DueDate.Value : DateTime.MinValue,
					Priority = t.Priority,
					IsCompleted = t.IsCompleted,
					CategoryId = t.CategoryId.HasValue ? (int)t.CategoryId : 0,
					DateCreated = t.DateCreated,
					UserId = t.UserId,
					Subtasks = t.Subtasks,
					Recurrence = t.Recurrence,
					Attachments = t.Attachments
				})
				.FirstOrDefaultAsync();

			if (item == null)
			{
				return NotFound();
			}

			return Ok(item);
		}

		// POST: api/todo
		[HttpPost]
		public async Task<ActionResult<ToDoItem>> PostTodoItem(
			[FromForm] string ToDoItem, [FromForm] List<IFormFile> attachments
		)
		{
			var createToDoItemsDTO = JsonConvert.DeserializeObject<CreateToDoItemsDTO>(ToDoItem);
			
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			int? categoryId = createToDoItemsDTO?.CategoryId;

			if (
				createToDoItemsDTO?.DueDate.HasValue == true
				&& createToDoItemsDTO.DueDate.Value.Date < DateTime.UtcNow.Date
			)
			{
				return BadRequest("Please Choose a due date that is later than today");
			}

			if (categoryId == null && !string.IsNullOrEmpty(createToDoItemsDTO?.CategoryName))
			{
				// Check if the category exists globally
				var existingCategory = await context.Categories.FirstOrDefaultAsync(c =>
					c.CategoryName == createToDoItemsDTO.CategoryName
				);

				if (existingCategory != null)
				{
					// If the category exists, use its CategoryId
					categoryId = existingCategory?.CategoryId;
				}
				else
				{
					// If the category does not exist, create a new one
					var newCategory = new Category
					{
						CategoryName = createToDoItemsDTO.CategoryName,
						UserId = userId,
						DateCreated = DateTime.UtcNow
					};

					context.Categories.Add(newCategory);
					await context.SaveChangesAsync();

					categoryId = newCategory.CategoryId;
				}
			}

			var item = new ToDoItem
			{
				TaskName = createToDoItemsDTO?.TaskName,
				TaskDescription = createToDoItemsDTO?.TaskDescription,
				DueDate = createToDoItemsDTO?.DueDate,
				Priority = createToDoItemsDTO?.Priority,
				IsCompleted = false,
				UserId = userId,
				CategoryId = categoryId,
				DateCreated = DateTime.UtcNow
			};

			context.ToDoItems.Add(item);
			await context.SaveChangesAsync();

			// Handle subtask
			if (createToDoItemsDTO?.Subtasks != null)
			{
				foreach (var subtaskDto in createToDoItemsDTO.Subtasks)
				{
					var subTask = new SubTasks
					{
						SubTaskName = subtaskDto.SubTaskName,
						SubtaskDescription = subtaskDto.SubtaskDescription,
						SubtaskDueDate = subtaskDto.SubtaskDueDate,
						SubtaskIsCompleted = false,
						TaskId = item.TaskId
					};
					context.SubTasks.Add(subTask);
				}
			}

			// Handle Reccurence
			if (createToDoItemsDTO?.Recurrence != null)
			{
				var recurrence = new Reccurence
				{
					Interval = createToDoItemsDTO.Recurrence.Interval,
					TaskId = item.TaskId
				};
				context.Reccurences.Add(recurrence);
			}

			// Handle Attachments
			// if (createToDoItemsDTO.Attachments != null )
			// {
			// 	foreach (var attachmentDTO in createToDoItemsDTO.Attachments)
			// 	{
			// 		var attachment = new Attachment
			// 		{
			// 			AttachmentName = attachmentDTO.AttachmentName,
			// 			AttachmentPath = attachmentDTO.AttachmentPath,
			// 			AttachmentType = attachmentDTO.AttachmentType,
			// 			TaskId = item.TaskId
			// 		};
			// 	}

			// 	context.Attachments.AddRange(createToDoItemsDTO.Attachments);
			// }
			if (attachments != null && attachments.Any())
			{
				foreach (var file in attachments)
				{
					if (file.Length > 0)
					{
						// Define a path to save the file
						var filePath = Path.Combine("wwwroot/uploads", Guid.NewGuid().ToString() + Path.GetExtension(file.FileName));

						// Save the file to the server
						using (var stream = new FileStream(filePath, FileMode.Create))
						{
							await file.CopyToAsync(stream);
						}

						var attachment = new Attachment
						{
							AttachmentName = file.FileName,
							AttachmentPath = filePath,
							AttachmentType = file.ContentType,
							TaskId = item.TaskId
						};
						context.Attachments.Add(attachment);
					}
				}
			}

			await context.SaveChangesAsync();

			return CreatedAtAction(
				nameof(GetToDoItem),
				new { id = item.TaskId },
				new ToDoItemsDTO
				{
					TaskId = item.TaskId,
					TaskName = item.TaskName,
					TaskDescription = item.TaskDescription,
					DateCreated = item.DateCreated,
					DueDate = item.DueDate.HasValue ? item.DueDate.Value : DateTime.MinValue,
					Priority = item.Priority,
					IsCompleted = item.IsCompleted,
					UserId = userId,
					CategoryId = item.CategoryId.HasValue ? (int)item.CategoryId : 0,
					Subtasks = item.Subtasks,
					Recurrence = item.Recurrence,
					Attachments = item.Attachments
				}
			);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateToDoItem(int id, UpdateToDoItemDTO dto)
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var toDoItem = await context
				.ToDoItems.Include(t => t.Subtasks)
				.Include(t => t.Recurrence)
				.Include(t => t.Attachments)
				.FirstOrDefaultAsync(t => t.TaskId == id && t.UserId == userId);

			if (toDoItem == null)
			{
				return NotFound();
			}

			toDoItem.TaskName = dto.TaskName;
			toDoItem.TaskDescription = dto.TaskDescription;
			toDoItem.DueDate = dto.DueDate;
			toDoItem.Priority = dto.Priority;
			toDoItem.IsCompleted = dto.IsCompleted;
			toDoItem.CategoryId = dto.CategoryId;

			// Add new subtask
			if (dto.Subtasks != null && toDoItem.Subtasks != null)
			{
				foreach (var subtaskDto in dto.Subtasks)
				{
					if (
						toDoItem.Subtasks.All(s => s != null && s.SubTaskId != subtaskDto.SubTaskId)
					)
					{
						var subTask = new SubTasks
						{
							SubTaskName = subtaskDto.SubTaskName,
							SubtaskDescription = subtaskDto.SubtaskDescription,
							SubtaskDueDate = subtaskDto.SubtaskDueDate,
							SubtaskIsCompleted = false,
							TaskId = toDoItem.TaskId
						};

						context.SubTasks.Add(subTask);
					}
				}
			}

			// Update recurrence
			if (dto.Recurrence != null)
			{
				if (toDoItem.Recurrence != null)
				{
					context.Reccurences.Remove(toDoItem.Recurrence);
				}
				var recurrence = new Reccurence
				{
					Interval = dto.Recurrence.Interval,
					TaskId = toDoItem.TaskId
				};
				context.Reccurences.Add(recurrence);
			}

			// Add new attachments if provided
			if (dto.Attachments != null)
			{
				foreach (var attachmentDto in dto.Attachments)
				{
					if (
						toDoItem.Attachments != null
						&& toDoItem.Attachments.All(a =>
							a.AttachmentId != attachmentDto.AttachmentId
						)
					) // Avoid duplicates
					{
						var attachment = new Attachment
						{
							AttachmentName = attachmentDto.AttachmentName,
							AttachmentPath = attachmentDto.AttachmentPath,
							AttachmentType = attachmentDto.AttachmentType,
							TaskId = toDoItem.TaskId
						};
						toDoItem.Attachments.Add(attachment);
					}
				}
			}

			context.Entry(toDoItem).State = EntityState.Modified;
			await context.SaveChangesAsync();

			var updatedItemDTO = new ToDoItemsDTO
			{
				TaskId = toDoItem.TaskId,
				TaskName = toDoItem.TaskName,
				TaskDescription = toDoItem.TaskDescription,
				DateCreated = toDoItem.DateCreated,
				DueDate = toDoItem.DueDate.HasValue ? toDoItem.DueDate.Value : DateTime.MinValue,
				Priority = toDoItem.Priority,
				IsCompleted = toDoItem.IsCompleted,
				UserId = toDoItem.UserId,
				CategoryId = toDoItem.CategoryId.HasValue ? (int)toDoItem.CategoryId : 0,
				Subtasks = toDoItem.Subtasks,
				Recurrence = toDoItem.Recurrence,
				Attachments = toDoItem.Attachments
			};

			return Ok(updatedItemDTO);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteToDoItem(int id)
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			var toDoItem = await context
				.ToDoItems.Include(t => t.Subtasks)
				.Include(t => t.Recurrence)
				.Include(t => t.Attachments)
				.FirstOrDefaultAsync(t => t.TaskId == id && t.UserId == userId);

			if (toDoItem == null)
			{
				return NotFound();
			}

			if (
				toDoItem.Subtasks != null
				&& toDoItem.Recurrence != null
				&& toDoItem.Attachments != null
			)
			{
				context.SubTasks.RemoveRange(toDoItem.Subtasks);
				context.Reccurences.Remove(toDoItem.Recurrence);
				context.Attachments.RemoveRange(toDoItem.Attachments);
			}

			context.ToDoItems.Remove(toDoItem);

			await context.SaveChangesAsync();

			return NoContent();
		}
	}
}
