<?php

test('redirects the home page to the enrollment list', function () {
    $response = $this->get(route('home'));

    $response->assertRedirect(route('enrollments.index'));
});
