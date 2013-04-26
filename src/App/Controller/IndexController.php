<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

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
}
