<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document
 */
class Article extends AbstractDocument
{
    /**
     * @MongoDB\EmbedMany(targetDocument="ArticleContent")
     */
    protected $versions = array();

    /**
     * 
     * @param \App\Document\AbstractContent $content
     * @return \App\Document\ArticleContent
     */
    public function createVersionContent(AbstractContent $content = null)
    {
        return new ArticleContent();
    }

    public function getText()
    {
        return $this->getCurrentVersion()->getText();
    }

    public function setText($text)
    {
        $this->getCurrentVersion()->setText($text);
    }
    
    public function getContent()
    {
        return $this->getCurrentVersion()->getContent();
    }
    
    public function setContent($content)
    {
        return $this->getCurrentVersion()->setContent($content);
    }
}
