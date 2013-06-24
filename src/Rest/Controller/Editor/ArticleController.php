<?php

namespace Rest\Controller\Editor;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\Annotations\RouteResource;

use App\Document\Article;
use Rest\Form\Type\DocumentType;

/**
 * @RouteResource("Article")
 */
class ArticleController extends Controller
{
    private $documentFields = array(
        'title',
        'description',
        'published'
    );
    
    public function cgetAction()
    {
        
    }

    /**
     * @View(SerializerGroups={"Editor"})
     * 
     * @param \App\Document\Article $article
     */
    public function getAction(Article $article)
    {
        return $article;
    }

    /**
     * @View(SerializerGroups={"Editor"})
     * @param \Symfony\Component\HttpFoundation\Request $request
     */
    public function cpostAction(Request $request)
    {
        $title = trim($request->get('title'));
        if (empty($title)) {
            throw new HttpException(400, 'Article title id missing');
        }
        
        $article = new \App\Document\Article($title);
        $article->setText('Your text');
        $dm = $this->get('dm');
        $dm->persist($article);
        
        $dm->flush();
        
        return $article;
    }

    /**
     * 
     * @View(SerializerGroups={"Editor"})
     * 
     * @param \Rest\Controller\Article $article
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return \App\Document\Article
     * @throws HttpException
     */
    public function cputAction(Article $article, Request $request)
    {
        $documentForm = $this->createForm(new DocumentType(), $article);

        $documentForm->submit($this->getDocumentData($request));

        if ($documentForm->isValid()) {
            $this->get('dm')->flush();
            return $article;
        } else {
            throw new HttpException(400, 'Can\'t save document');
        }
    }

    /**
     * @View()
     * 
     * @param \App\Document\Article $article
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return \App\Document\Article
     * @throws HttpException
     */
    public function putContentAction(Article $article, Request $request)
    {
        $fullContent = $request->get('content');

        if (empty($fullContent) || !array_key_exists('j-article-content', $fullContent)) {
            throw new HttpException(400, 'Article content missing');
        }

        $content = $fullContent['j-article-content'];

        $article->setContent($content);

        $dm = $this->get('dm');
        $dm->persist($article);

        $dm->flush();

        return $article;
    }

    /**
     * 
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return array
     */
    protected function getDocumentData(Request $request)
    {
        return array_intersect_key($request->request->all(), array_flip($this->documentFields));
    }
}
