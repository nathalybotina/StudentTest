using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace StudentTest.Data.Repositories
{
    public class StudentRepository : IStudentRepository
    {
        private readonly ApplicationDBContext _dbContext;

        public StudentRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IReadOnlyList<Models.Student>> GetAllAsync(CancellationToken token = default)
        {
            var students = await _dbContext.Students.AsNoTracking().ToListAsync(token);
            return students;
        }

        public async Task<Models.Student> Createsync(Models.Student student, CancellationToken token = default)
        {
            await _dbContext.Students.AddAsync(student, token);
            await _dbContext.SaveChangesAsync(token);
            return student;
        }
        public async Task<Models.Student> UpdateAsync(Models.Student student, CancellationToken token = default)
        {
            _dbContext.Students.Attach(student);
            _dbContext.Entry(student).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync(token);
            return student;
        }

        public async Task DeleteAsync(int id, CancellationToken token = default)
        {
            var student = await _dbContext.Students.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id, token);
            if (student != null)
            {
                var studentToDelete = new Data.Models.Student
                {
                    Id = id
                };
                _dbContext.Students.Attach(studentToDelete);
                _dbContext.Students.Remove(studentToDelete);
                await _dbContext.SaveChangesAsync(token);
            }
        }
    }
}
