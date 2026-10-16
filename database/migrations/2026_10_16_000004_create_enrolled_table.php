<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('enrolled', function (Blueprint $table) {
            $table->id();
            $table->foreignId('studid')->constrained('students', 'studid');
            $table->foreignId('syid')->constrained('schoolyears', 'syid');
            $table->foreignId('courseid')->constrained('courses', 'courseid')->cascadeOnDelete();
            $table->string('yearlevel', 20);
            $table->string('section', 10);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrolled');
    }
};
