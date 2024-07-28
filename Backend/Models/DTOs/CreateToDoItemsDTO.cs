using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.DTOs
{
	public class CreateToDoItemsDTO
	{
		public string? TaskName { get; set; }
		public string? TaskDescription { get; set; }
        public DateTime? DueDate { get; set; }
        public string? Priority { get; set; }
        public int CategoryId { get; set; }
	}
}