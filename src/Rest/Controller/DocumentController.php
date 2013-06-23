<?php

namespace Rest\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\Annotations\RouteResource;
use Rest\Form\Type\DocumentVersionType;
use App\Document\Article;

/**
 * @RouteResource("Document")
 */
class DocumentController extends Controller
{
    private $versionFields = array(
        'title',
        'published'
    );

    /**
     * @View(SerializerGroups={"Editor"})
     */
    public function putVersionsChangeAction($documentId, Request $request)
    {
        /* @var $document \App\Document\AbstractDocument  */
        $document = $this->getDocument($documentId);
        $versionId = $request->get('new_current_version');
        
        try {
            $version = $document->getVersion($versionId);

            $document->setCurrentVersionId($version->getId());
            $this->get('dm')->flush();
            
            return $document;
            
        } catch (\Exception $exception) {
            throw new HttpException(500, 'Can\'t change version', $exception);
        }
        
        return $document;
    }

    /**
     * @View(SerializerGroups={"Editor"})
     */
    public function postVersionsAction($documentId, Request $request)
    {
        $document = $this->get('dm')->getRepository('App\Document\Article')->findUserDocumentById($this->getUser(), $documentId);
        if (empty($document)) {
            throw $this->createNotFoundException('Document not found');
        }

        $parentVersionId = $request->get('parent_version_id');
        if (empty($parentVersionId)) {
            throw $this->createNotFoundException('Parent document version not found');
        }

        try {
            $document->createVersion($document->getVersion($parentVersionId));
            $this->get('dm')->flush();
        } catch (\Exception $exception) {
            throw new HttpException(500, 'Can\'t create version', $exception);
        }

        return $document;
    }

    /**
     * @View(SerializerGroups={"Editor"})
     * @param \Symfony\Component\HttpFoundation\Request $request
     */
    public function putVersionAction($documentId, $versionId, Request $request)
    {
        /* @var $document \App\Document\AbstractDocument  */
        $document = $this->getDocument($documentId);

        try {
            $version = $document->getVersion($versionId);

            $versionForm = $this->createForm(new DocumentVersionType(), $version);

            $versionForm->submit($this->getVersionData($request));

            if ($versionForm->isValid()) {
                $this->get('dm')->flush();
                return $document;
            }
        
            throw new HttpException(400, 'Version is not valid');
            
        } catch (\Exception $exception) {
            throw new HttpException(500, 'Can\'t save version', $exception);
        }
    }

    /**
     * @View(SerializerGroups={"Editor"})
     */
    public function deleteVersionAction($documentId, $versionId, Request $request)
    {
        /* @var $document \App\Document\AbstractDocument  */
        $document = $this->getDocument($documentId);

        try {
            if ($document->removeVersion($versionId)) {
                $this->get('dm')->flush();
                return $document;
            }
            
            throw new HttpException(400, 'Can not remove version');
            
        } catch (\Exception $exception) {
            throw new HttpException(500, 'Can\'t remove version', $exception);
        }
    }
    
    /**
     * 
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return array
     */
    private function getVersionData(Request $request)
    {
        return array_intersect_key($request->request->all(), array_flip($this->versionFields));
    }
    
    /**
     * 
     * @param string $id
     * @return \App\Document\AbstractDocument
     * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
     */
    private function getDocument($id)
    {
        /* @var $document \App\Document\AbstractDocument  */
        $document = $this->get('dm')->getRepository('App\Document\Article')->findUserDocumentById($this->getUser(), $id);
        if (empty($document)) {
            throw $this->createNotFoundException('Document not found');
        }
        
        return $document;
    }
}
