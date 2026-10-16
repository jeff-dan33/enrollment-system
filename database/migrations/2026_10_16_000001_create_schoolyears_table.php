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
        Schema::create('schoolyears', function (Blueprint $table) {
            $table->bigIncrements('syid');
            $table->string('schoolyear', 20);
            $table->foreignId('semid')->constrained('semesters', 'semid')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schoolyears');
    }
};
