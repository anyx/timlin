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
    public function indexAction()
    {
        /**
         * @todo Common Repo
         */
        $documents = $this->get('dm')->getRepository('App\Document\Article')->getPopularDocuments(10);
        
        return $this->render(
            'App:Viewer:index.html.twig',
            array(
                'documents' => $documents
            )
        );
    }
    
    /**
     * @Route("/view/{id}", name="view_document")
     * @param string $id
     */
    public function viewAction($id)
    {
        
        $document = $this->get('dm')->getRepository('App\Document\Article')->getPublicDocument($id);
        
        if (empty($document)) {
            throw $this->createNotFoundException('Document not found');
        }
        
        return $this->render(
            'App:Viewer:view.html.twig',
            array(
                'document' => $document
            )
        );
    }
}
