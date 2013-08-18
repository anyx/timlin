<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Document\Article;

/**
 * 
 */
class ViewerController extends Controller
{
    /**
     * 
     * @Route("/")
     */
    public function listAction()
    {
        /**
         * @todo Common Repo
         */
        $documents = $this->get('dm')->getRepository('App\Document\Article')->findPopularDocuments(10);
        
        return $this->render(
            'App:Viewer:list.html.twig',
            array(
                'documents' => $documents
            )
        );
    }
    
    /**
     * @Route("/view", name="viewer")
     */
    public function viewerAction()
    {
        return $this->render(
            'App:Viewer:viewer.html.twig',
            array()
        );
    }
}
