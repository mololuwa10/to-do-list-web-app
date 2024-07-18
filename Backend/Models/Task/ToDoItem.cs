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
		
		public bool? IsCompleted { get; set; }
	}
}