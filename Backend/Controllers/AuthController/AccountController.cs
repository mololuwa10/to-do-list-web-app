using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Models.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Backend.Models.Token;
using Backend.Data;
using System.ComponentModel.DataAnnotations;

namespace Backend.Controllers.AuthController
{
	[ApiController]
	[Route("api/[controller]")]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<User>? userManager;
		private readonly SignInManager<User>? signInManager;
		private readonly IConfiguration? configuration;
		
		public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration) 
		{
			this.userManager = userManager;
			this.signInManager = signInManager;
			this.configuration = configuration;
		}
		
		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] RegisterModel model)
		{
			if (ModelState.IsValid)
			{
				var user = new User { FirstName = model.FirstName, LastName = model.LastName, UserName = model.Username, Email = model.Email, DateCreated = DateTime.UtcNow.ToUtc() };
				var result = await userManager!.CreateAsync(user, model.Password ?? string.Empty);

				if (result.Succeeded)
				{
					var token = JwtTokenGenerator.GenerateToken(user.Id.ToString(), user.UserName ?? string.Empty, configuration!);
					return Ok(new { Token = token, message = "User registered successfully" });
				}

				foreach (var error in result.Errors)
				{
					ModelState.AddModelError(string.Empty, error.Description);
				}
			}

			return BadRequest(ModelState);
		}
		
		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] LoginModel model) 
		{
			if (ModelState.IsValid) 
			{
				User? user = null;
				
				if (new EmailAddressAttribute().IsValid(model.UsernameOrEmail)) 
				{
					user = await userManager!.FindByEmailAsync(model.UsernameOrEmail ?? string.Empty);
				} 
				else 
				{
					user = await userManager!.FindByNameAsync(model.UsernameOrEmail ?? string.Empty);
				}
				
				if (user != null) 
				{
					var result = await signInManager!.CheckPasswordSignInAsync(user, model.Password ?? string.Empty, false);
					
					if (result.Succeeded) 
					{
						var token = JwtTokenGenerator.GenerateToken(user.Id.ToString(), user.UserName ?? string.Empty, configuration!);
						return Ok(new { Token = token, message = "Login successful" });
					}
				}

				ModelState.AddModelError(string.Empty, "Invalid Login attempt");
			}

			return BadRequest(ModelState);
		}
	}
}