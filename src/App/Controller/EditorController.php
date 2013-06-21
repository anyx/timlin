<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class EditorController extends Controller
{
    /**
     * @Route("/editor")
     */
    public function indexAction()
    {
        return $this->render(
            'App:Editor:index.html.twig'
        );
    }
    
    /**
     * @Route("/test")
     */
    public function testAction()
    {
        return $this->render(
            'App:Editor:test.html.twig'
        );
    }
}
