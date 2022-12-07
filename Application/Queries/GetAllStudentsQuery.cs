using MediatR;
using System.Collections.Generic;

namespace StudentTest.Application.Queries
{
    public class GetAllStudentsQuery : IRequest<IReadOnlyList<Data.Models.Student>>
    {

    }
}
