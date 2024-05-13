using Microsoft.EntityFrameworkCore;
using NewsAPI.Models;
using System;

namespace NewsAPI.Data
{
    public partial class APIContext : DbContext
    {
        public APIContext(DbContextOptions<APIContext> options) : base(options)
        {
        }

        public virtual DbSet<AdminModel> Admin{ get; set; }
        public virtual DbSet<AuthorModel> Author{ get; set; }
        public virtual DbSet<NewsModel> News{ get; set; }
        public virtual DbSet<AuthorNewsModel> AuthorNews{ get; set; }
        public virtual DbSet<SectionsModel> Sections{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<AdminModel>(entity => { entity.HasNoKey(); });
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<AuthorModel>(entity => { entity.HasNoKey(); });
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<NewsModel>(entity => { entity.HasNoKey(); });
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<AuthorNewsModel>(entity => { entity.HasNoKey(); });
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<SectionsModel>(entity => { entity.HasNoKey(); });
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
