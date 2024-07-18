using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.Task
{
	public class ToDoItem
	{
		[Key]
		public int TaskId { get; set; }
		
		[Required]
		public string? TaskName { get; set; }
		
		public string? TaskDescription { get; set; }
		
		public DateTime? DueDate { get; set; }
		
		public string? Priority { get; set; } // e.g., Low, Medium, High

		public string? Category { get; set; } // e.g., Work, Personal
		
		public bool? IsCompleted { get; set; }
		
		public ICollection<SubTasks>? Subtasks { get; set; }

		public Reccurence? Recurrence { get; set; }

		public ICollection<Attachment>? Attachments { get; set; }
		
		// Foreign key for User
        public int? UserId { get; set; }

        // Navigation property for related user
        public User? User { get; set; }
	}
}