<?php

namespace Rest\Controller;

use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations\RouteResource;

/**
 * @RouteResource("Timeline")
 */
class TimelineController extends Controller
{
    /**
     * 
     * @return array
     */
    public function cgetAction()
    {
        return new Response(json_encode([]));
    }

    /**
     * 
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function getAction($id)
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
