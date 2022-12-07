using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace StudentTest.Data.Repositories
{
    public interface IStudentRepository
    {
        Task<IReadOnlyList<Models.Student>> GetAllAsync(CancellationToken token = default);
        Task<Models.Student> Createsync(Models.Student student, CancellationToken token = default);

        Task<Models.Student> UpdateAsync(Models.Student student, CancellationToken token = default);
        Task DeleteAsync(int id, CancellationToken token = default);
    }
}
