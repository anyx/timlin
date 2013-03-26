<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;

/**
 * 
 */
class RestController extends Controller
{
    public function showAction()
    {
        return new Response(json_encode(
                [
                    'name'      => 'Test timeline',
                    'points'    => [
                        [
                            'title'         => 'First point',
                            'description'   => 'Description',
                            'date'          => date('c')
                        ],
                        [
                            'title'         => 'Second point',
                            'description'   => 'Second description',
                            'date'          => date(time() - 8000)
                        ]
                    ]
                ]
        ));
    }
}
