<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

/**
 * 
 */
class TimelineController extends Controller
{
    /**
     * 
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function showAction($id)
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
    
    public function listAction()
    {
        
    }
}
