using System.ComponentModel.DataAnnotations;

namespace StudentTest.ViewModel
{
    public class StudentViewModel
    {
        public int? Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [MaxLength(20, ErrorMessage = "{0} must be {1} characters or less")]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(20, ErrorMessage = "{0} must be {1} characters or less")]
        public string LastName { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        [MaxLength(50, ErrorMessage = "{0} must be {1} characters or less")]
        public string Career { get; set; }

        public StudentViewModel(int? id, string userName, string firstName, string lastName, int age, string career)
        {
            Id = id;
            UserName = userName;
            FirstName = firstName;
            LastName = lastName;
            Age = age;
            Career = career;
        }


    }
}
