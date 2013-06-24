<?php

namespace Rest\Controller\Viewer;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use FOS\RestBundle\Controller\Annotations\View;

/**
 * @RouteResource("Document")
 */
class DocumentController extends Controller
{
    /**
     * @View(SerializerGroups={"Viewer"})
     */
    public function cgetAction()
    {
    }

    /**
     * @View(SerializerGroups={"Viewer"})
     * @param string $documentId
     */
    public function getAction($documentId)
    {
        /* @var $repoManager \Doctrine\ODM\MongoDB\DocumentManager */
        $repoManager = $this->get('doctrine_mongodb')->getManager();
        $document = $repoManager->getRepository("App\Document\Article")->findPublicDocument($documentId);

        if (empty($document)) {
            throw $this->createNotFoundException("Document not found");
        }

        return $document;
    }
    
    /**
     * @View(SerializerGroups={"Viewer"})
     * @param string $documentId
     * @param string $versionId
     */
    public function getVersionAction($documentId, $versionId = null)
    {
        
    }
}
