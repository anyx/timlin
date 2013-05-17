<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class IndexController extends Controller
{
    /**
     * 
     */
    public function indexAction()
    {
        return $this->render(
            'App:Index:index.html.twig'
        );
    }
    
    /**
     * @Route("/test")
     */
    public function testAction()
    {
        return $this->render(
            'App:Index:test.html.twig'
        );
    }
}
