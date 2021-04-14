using BookListMVC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookListMVC.Controllers
{
    public class BooksController : Controller
    {
        private readonly ApplicationDbContext _db;

        [BindProperty]
        public Book Book { get; set; }

        public BooksController(ApplicationDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return View();
        }


        public async Task<IActionResult> Upsert(int? id)
        {
            Book = new Book();
            if (id == null)
            {
                // create
                return View(Book);
            }
            // update
            Book = await _db.Books.FirstOrDefaultAsync(b => b.Id == id);
            if (Book == null)
            {
                return NotFound();
            }

            return View(Book);
        }

        [HttpPost]
        [ValidateAntiForgeryToken] // to prevent attacks
        public async Task<IActionResult> Upsert() // Book book> gerk yok çnk BindProperty ile book zaten var bizde
        {
            if (ModelState.IsValid)
            {
                if (Book.Id == null)
                {
                    // create
                    _db.Books.Add(Book);
                }
                else
                {
                    // update
                    _db.Books.Update(Book);
                }
                await _db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(Book);
        }

        #region API Calls

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Json(new { data = await _db.Books.ToListAsync() });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var bookToDelete = await _db.Books.FirstOrDefaultAsync(u => u.Id == id);
            if (bookToDelete == null)
            {
                return Json(new { success = false, message = "Error while deleting" });
            }
            _db.Books.Remove(bookToDelete);
            await _db.SaveChangesAsync();

            return Json(new { success = true, message = "Delete successful" });
        }

        #endregion
    }
}
