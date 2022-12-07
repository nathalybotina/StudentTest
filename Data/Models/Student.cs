using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentTest.Data.Models
{
    [Table(nameof(Student))]
    public class Student
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(20, ErrorMessage = "{0} must be {1} characters or less")]
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

    }
}
