using CMS.Data;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMS.data.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20260626093000_RemoveCategoryProductParent")]
    public partial class RemoveCategoryProductParent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoriesProducts_CategoriesProducts_ParentId",
                table: "CategoriesProducts");

            migrationBuilder.DropIndex(
                name: "IX_CategoriesProducts_ParentId",
                table: "CategoriesProducts");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "CategoriesProducts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ParentId",
                table: "CategoriesProducts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CategoriesProducts_ParentId",
                table: "CategoriesProducts",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoriesProducts_CategoriesProducts_ParentId",
                table: "CategoriesProducts",
                column: "ParentId",
                principalTable: "CategoriesProducts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
